<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Purchase;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\WebhookClient\Models\WebhookCall;
use Illuminate\Support\Facades\Log;

class SessionCompletedJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var \Spatie\WebhookClient\Models\WebhookCall */
    public $webhookCall;

    /**
     * Create a new job instance.
     */
    public function __construct(WebhookCall $webhookCall)
    {
        $this->webhookCall = $webhookCall;
    }

    public function handle()
    {

        \Stripe\Stripe::setApiKey(config('stripe.sk'));
        $id = [$this->webhookCall->payload['data']['object']['id']];
        $session = \Stripe\Checkout\Session::retrieve($id[0], ['expand' => ['line_items']]);

        $metadata = $session->metadata;

        $isLogged = $metadata['isLogged'];
        $email = $metadata['email'];
        $licenses_bought = json_decode($metadata['licenses_bought']);
        $user_id = $metadata['user_id'];

        if($isLogged)
        {



            for ($i = 0; $i < count($licenses_bought); $i++) {
                $purchase = Purchase::create([
                    'user_id' => $user_id,
                    'beat_license_id' => $licenses_bought[$i]->id,
                    'email' => $email,
                    'price' => $licenses_bought[$i]->price,
                    'created_at' => $session->created,
                    'updated_at' => $session->created
                ]);
            }
            // Asociar la compra al usuario y enviar un correo.
        }
        else
        {
            // Enviar un correo.
        }



        // do your work here
        Log::info("Session Info : ", [$isLogged, $email, $licenses_bought]);
        // you can access the payload of the webhook call with `$this->webhookCall->payload`
    }
}
