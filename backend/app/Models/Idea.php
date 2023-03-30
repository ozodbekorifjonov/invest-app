<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'abstract', 'publish_date', 'expiry_date','content','risk_rating','fields'];
    public function idea_list()
    {
        return $this->belongsTo(Fields::class);
    }
}
