<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function ideas()
    {
        return $this->belongsToMany(Idea::class, 'idea_instruments');
    }
}
