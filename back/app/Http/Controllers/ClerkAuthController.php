<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class ClerkAuthController extends Controller
{
    public function user_created(Request $request)
    {
        Log::info('Clerk user created webhook received' . $request);

        User::create([
            'clerk_id' => $request['data']['id'],
            'email' => $request['data']['email_addresses'][0]['email_address'],
            'created_at' => $request['data']['created_at'],
            'updated_at' => $request['data']['updated_at'],
        ]);

        return response()->json(['status' => 'ok'], 200);
    }

    public function user_updated(Request $request)
    {
        Log::info('Clerk user updated webhook received');

        User::where('clerk_id', $request['data']['id'])->update([
            'email' => $request['data']['email_addresses'][0]['email_address'],
            'updated_at' => $request['data']['updated_at'],
        ]);

        return response()->json(['status' => 'ok'], 200);
    }

    public function user_deleted(Request $request)
    {
        Log::info('Clerk user deleted webhook received');

        User::where('clerk_id', $request['data']['id'])->delete();

        return response()->json(['status' => 'ok'], 200);
    }

}
