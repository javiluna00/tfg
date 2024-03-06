<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Http\Resources\UserResource;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;




class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'loginOauth', 'checkUserGoogle']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $token = JWTAuth::fromUser(auth()->user());

        $user = auth('api')->user();

        $cart = Cart::where('user_id', $user->id)->first();

        $saves = $user->savedBeats();

        return response()->json(['token' => $token, 'user' => UserResource::make($user), 'cart' => $cart ? CartResource::make($cart) : null, 'saves' => $saves], 200);
    }

    public function checkUserGoogle(Request $request)
    {
        $checkEmail = User::where([['email', "=", $request->email], ['google_id', "=", null]])->first();
        if ($checkEmail) {
            return response()->json(['message' => 'Ese email ya está registrado en una cuenta normal.'], 409);
        }


        $user = User::where('google_id', $request->google_id)->first();
        return response()->json($user);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'artist_name' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);



        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'artist_name' => $request->artist_name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->assignRole('user');



        return response()->json([
            'message' => 'Successfully registered',
            'user' => $user . $user->getRoleNames(),
        ], 201);

    }

    public function loginOauth(Request $request)
    {
        $requestUser = $request->user;
        $requestToken = $request->token;
        // Recibir los datos del frontend

        // Aquí puedes utilizar los datos para autenticar al usuario con Google OAuth
        // Por ejemplo, verificar el token de acceso con la API de Google y obtener información del usuario
        // Luego, puedes crear o actualizar el usuario en tu base de datos y generar un token JWT para este usuario

        // Ejemplo de respuesta

        $artistName = $requestUser['artist_name'] ?? null;

        $user = User::firstOrCreate(['google_id' => $requestUser['google_id']], [
            'name' => $requestUser['name'],
            'email' => $requestUser['email'],
            'google_id' => $requestUser['google_id'],
            'artist_name' => $artistName,
            'email_verified_at' => now()
        ]);

        $user->assignRole('user');
        $role = $user->getRoleNames();

        $token = JWTAuth::fromUser($user);

        $cart = Cart::where('user_id', $user->id)->first();

        $saves = $user->savedBeats();

        return response()->json(['token' => $token, 'user' => UserResource::make($user), 'cart' => $cart ? CartResource::make($cart) : null, 'saves' => $saves], 200);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }



}
