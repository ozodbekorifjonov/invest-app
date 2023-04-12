<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function ideas()
    {
        return $this->belongsToMany(Idea::class, 'idea_currencies');
    }
}
