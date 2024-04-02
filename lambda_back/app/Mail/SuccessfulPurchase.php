<?php

namespace App\Mail;

use App\Models\BeatLicense;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SuccessfulPurchase extends Mailable
{
    use Queueable, SerializesModels;



    /**
     * Create a new message instance.
     */
    public function __construct(private string $title, private bool $isLoggged, private User $user, private array $licenses)
    {
        $this->title = $title;
        $this->isLoggged = $isLoggged;
        $this->user = $user;
        $this->licenses = $licenses;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.SuccessfulPurchaseEmailView',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // $res = [];
        // foreach ($this->licenses as $license) {
        //     $licenseDB = BeatLicense::where('id', $license['id'])->first();
        //     $res = $res + Attachment::fromStorage($licenseDB->file_url);
        // }

        return [];
    }
}
