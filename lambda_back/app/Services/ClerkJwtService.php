<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Exception;

class ClerkJwtService
{
    protected string $jwksUrl;
    protected int $jwksCacheTtl = 3600; // Cache JWKs por 1 hora

    public function __construct()
    {
        // Obtén tu URL de JWKs de Clerk desde las variables de entorno de Laravel
        // Asegúrate de que esta variable de entorno esté definida en tu .env de Laravel
        $this->jwksUrl = env('CLERK_JWKS_URL', 'https://related-osprey-20.clerk.accounts.dev/.well-known/jwks.json');
    }

    protected function getJwks(): array
    {
        // Cachear las JWKs para evitar solicitudes repetidas a Clerk
        return Cache::remember('clerk_jwks', $this->jwksCacheTtl, function () {
            $response = Http::get($this->jwksUrl);

            if ($response->failed()) {
                throw new Exception('No se pudieron obtener las JWKs de Clerk.');
            }

            return $response->json()['keys'];
        });
    }

    /**
     * Verifica un token JWT de Clerk y devuelve los claims si es válido.
     *
     * @param string $token
     * @return object|null
     * @throws Exception
     */
    public function verifyToken(string $token): ?object
    {
        try {
            $jwks = $this->getJwks();
            $decodedToken = null;

            // Iterar sobre las JWKs para encontrar la clave correcta para la verificación
            foreach ($jwks as $jwk) {
                // firebase/php-jwt espera un arreglo de keys en el formato esperado
                // Necesitamos el algoritmo (alg) y el ID de la clave (kid) del header del JWT
                // para encontrar la clave pública correcta.
                // Sin embargo, JWT::decode puede encontrar la clave por 'kid' si el JWK lo contiene
                // y el algoritmo es compatible.

                try {
                    // Decodificar el token con todas las JWKs disponibles
                    // JWT::decode intentará encontrar el 'kid' en el token y la JWK correspondiente.
                    $decodedToken = JWT::decode($token, new Key($jwk['n'], $jwk['alg']));
                    // Si la decodificación tiene éxito, significa que encontramos la clave correcta
                    return $decodedToken;
                } catch (\Firebase\JWT\ExpiredException $e) {
                    throw new Exception('El token JWT ha expirado.');
                } catch (\Firebase\JWT\SignatureInvalidException $e) {
                    // Ignorar esta excepción si aún no hemos encontrado la clave correcta
                    // y probar con la siguiente JWK.
                    continue;
                } catch (\Firebase\JWT\BeforeValidException $e) {
                    throw new Exception('El token JWT aún no es válido.');
                } catch (Exception $e) {
                    // Otros errores de JWT específicos para esta JWK
                    continue;
                }
            }

            // Si llegamos aquí, ninguna JWK pudo verificar el token
            throw new Exception('Firma del token JWT inválida o clave no encontrada.');

        } catch (Exception $e) {
            // Captura cualquier excepción durante el proceso de verificación
            throw new Exception("Error al verificar el token de Clerk: " . $e->getMessage());
        }
    }
}