<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth; // ¡Importa el Facade Auth!
use App\Models\User; // ¡Importa tu modelo de usuario de Laravel!

class ClerkJwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Token de autenticación no proporcionado.'], 401);
        }

        $token = substr($authHeader, 7);

        try {
            // 1. Obtener las JWKs de Clerk (cachear para producción)
            // En producción, considera usar un servicio como el que te mostré antes para cachear estas claves
            $jwksResponse = Http::get(env('CLERK_JWKS_URL', 'https://related-osprey-20.clerk.accounts.dev/.well-known/jwks.json'));
            if ($jwksResponse->failed()) {
                 // Puedes loggear el error aquí
                return response()->json(['message' => 'Error al obtener las claves de verificación.', 'error' => 'JWKS fetch failed'], 500);
            }
            $jwks = $jwksResponse->json();
            
            // Decodificar y verificar el token JWT usando las JWKs
            $decoded = JWT::decode($token, JWK::parseKeySet($jwks));
            
            // 2. Extraer el user_id de Clerk (el 'sub' claim)
            $clerkUserId = $decoded->sub;

            // 3. Buscar al usuario en tu base de datos por el clerk_id
            $user = User::where('clerk_id', $clerkUserId)->first();

            // Si el usuario no existe en tu base de datos local
            if (!$user) {
                // Opción A: Registrar al usuario si es la primera vez que inicia sesión con Clerk
                // Esta lógica es común si no usas webhooks o si quieres un registro "just-in-time"
                // Asegúrate de tener los campos necesarios en tu tabla 'users' y en los claims de Clerk
                // Puedes acceder a otros claims como $decoded->email, $decoded->given_name, etc.
                /*
                $user = User::create([
                    'clerk_id' => $clerkUserId,
                    'name' => $decoded->name ?? 'Usuario Clerk', // Asume que 'name' existe en los claims
                    'email' => $decoded->email ?? ($decoded->email_addresses[0]->email_address ?? 'unknown@example.com'), // Obtener email
                    // ... otros campos
                ]);
                */
                
                // Opción B (Más común si usas webhooks): El usuario debería existir. Si no, es un problema.
                return response()->json(['message' => 'Usuario no encontrado en la base de datos local. Por favor, intente de nuevo o contacte soporte.'], 403);
            }

            // 4. Autenticar al usuario en Laravel para la solicitud actual
            Auth::login($user); // Esto hace que Auth::user() esté disponible

            // Opcional: Hacer el clerk_user_id también disponible directamente en la solicitud
            $request->attributes->set('clerk_user_id', $clerkUserId);

            // Opcional: También puedes establecer el resolvedor de usuario en la solicitud
            // para que $request->user() devuelva el mismo objeto User
            $request->setUserResolver(function () use ($user) {
                return $user;
            });


        } catch (\Firebase\JWT\ExpiredException $e) {
            return response()->json(['message' => 'Token JWT expirado.', 'error' => $e->getMessage()], 401);
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            return response()->json(['message' => 'Firma del token JWT inválida.', 'error' => $e->getMessage()], 401);
        } catch (\Firebase\JWT\BeforeValidException $e) {
            return response()->json(['message' => 'Token JWT aún no es válido.', 'error' => $e->getMessage()], 401);
        } catch (\Exception $e) {
            // Captura cualquier otra excepción durante la verificación del token
            return response()->json(['message' => 'Token de autenticación inválido.', 'error' => $e->getMessage()], 401);
        }

        return $next($request);
    }
}