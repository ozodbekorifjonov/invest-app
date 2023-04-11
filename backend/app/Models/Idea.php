<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function risk_ratings()
    {
        return $this->belongsToMany(RiskRating::class, 'idea_risk_rating');
    }
}
