<?php

namespace App\Jobs\StripeWebhooks;
use App\Models\Beat;
use App\Models\License;
use App\Mail\SuccessfulPurchaseLogged;
use App\Mail\SuccessfulPurchaseNotLogged;
use App\Models\BeatLicense;
use App\Models\Purchase;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\WebhookClient\Models\WebhookCall;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Uuid;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
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
        Log::info("[STRIPE] SESSION COMPLETED : ", [$metadata]);
        if($isLogged == "true")
        {
            for ($i = 0; $i < count($licenses_bought); $i++) {
                $licenseBought = BeatLicense::where('id', $licenses_bought[$i]->id)->first();
                $beatBought = Beat::where('id', $licenseBought->beat_id)->first();
                if($beatBought->stock > 0)
                {
                    if(License::where('id', $licenseBought->license_id)->first()->name == 'Licencia exclusiva')
                    {
                        if($beatBought->still_exclusive == 1)
                        {
                            // COMPRA LA LICENCIA EXCLUSIVA
                            $purchase = Purchase::create([
                                'user_id' => $user_id,
                                'beat_license_id' => $licenseBought->id,
                                'email' => $email,
                                'price' => $licenseBought->price,
                                'created_at' => $session->created,
                                'updated_at' => $session->created
                            ]);
                            Beat::where('id', $beatBought->id)->update(['stock' => 0, 'still_exclusive' => 0]);
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        $purchase = Purchase::create([
                            'user_id' => $user_id,
                            'beat_license_id' => $licenseBought->id,
                            'email' => $email,
                            'price' => $licenseBought->price,
                            'created_at' => $session->created,
                            'updated_at' => $session->created
                        ]);
                        BeatLicense::where(['beat_id' => $beatBought->id, 'license_id' => License::where('name', 'Licencia exclusiva')->first()->id])->delete();
                        Beat::where('id', $beatBought->id)->update(['stock' => $beatBought->stock - 1, 'still_exclusive' => 0]);
                    }



                }

            }
            // Asociar la compra al usuario y enviar un correo.
            $user = User::find($user_id);
            if(!$user)
            {
                return false;
            }
            Mail::to($user->email)->send(new SuccessfulPurchaseLogged("[Lambda Beats] Descarga tus licencias.", $user_id, $licenses_bought));
        }
        else if($isLogged == "false")
        {
            for ($i = 0; $i < count($licenses_bought); $i++) {
                $licenseBought = BeatLicense::where('id', $licenses_bought[$i]->id)->first();
                $beatBought = Beat::where('id', $licenseBought->beat_id)->first();
                if($beatBought->stock > 0)
                {
                    if(License::where('id', $licenseBought->license_id)->first()->name == 'Licencia exclusiva')
                    {
                        if($beatBought->still_exclusive == 1)
                        {
                            // COMPRA LA LICENCIA EXCLUSIVA
                            $purchase = Purchase::create([
                                'user_id' => null,
                                'beat_license_id' => $licenseBought->id,
                                'email' => $email,
                                'price' => $licenseBought->price,
                                'created_at' => $session->created,
                                'updated_at' => $session->created
                            ]);
                            Beat::where('id', $beatBought->id)->update(['stock' => 0, 'still_exclusive' => 0]);

                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        $purchase = Purchase::create([
                            'user_id' => null,
                            'beat_license_id' => $licenseBought->id,
                            'email' => $email,
                            'price' => $licenseBought->price,
                            'created_at' => $session->created,
                            'updated_at' => $session->created
                        ]);
                        Beat::where('id', $beatBought->id)->update(['stock' => $beatBought->stock - 1]);
                        BeatLicense::where(['beat_id' => $beatBought->id, 'license_id' => License::where('name', 'Licencia exclusiva')->first()->id])->delete();
                    }



                }
            }
            // Enviar un correo.
            Mail::to($email)->send(new SuccessfulPurchaseNotLogged("[Lambda Beats] Descarga tus licencias.",$email, $licenses_bought));
        }





        // $emailController = new EmailController();
        // $emailController->sendSuccessfulPurchaseEmail($email, $isLogged, $licenses_bought, $user_id);



        // do your work here

        // you can access the payload of the webhook call with `$this->webhookCall->payload`
    }
}
