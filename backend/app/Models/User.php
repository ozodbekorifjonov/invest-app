<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'telephone',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'product_types' => 'array',
        'currencies' => 'array',
        'countries' => 'array',
    ];

    public function ideas()
    {
        return $this->hasMany(Idea::class);
    }

    public function holdings()
    {
        return $this->belongsToMany(Idea::class, 'idea_holders');
    }

    public function possible_ideas()
    {
        return $this->belongsToMany(Idea::class, 'idea_possible_clients');
    }

    public function rm_recommended_ideas()
    {
        return $this->belongsToMany(Idea::class, 'idea_rms');
    }
}
