<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
class PasswordResetRequest extends Notification implements ShouldQueue
{
    use Queueable;

    protected $tries = 3;

    private $token;
    private $email;

    /**
     * PasswordResetRequest constructor.
     * @param $passwordReset
     */
    public function __construct($passwordReset)
    {
        $this->token = $passwordReset->token;
        $this->email = str_replace('@', '29gnmLTv686QsnV', $passwordReset->email);
    }
    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }
    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('You are receiving this email because we        received a password reset request for your account.')
            ->action('Reset', url("password-update/$this->token/$this->email"))
            ->line('If you did not request a password reset, no further action is required.');
    }
    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}