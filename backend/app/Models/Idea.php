<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'abstract',
        'publish_date',
        'expiry_date',
        'user_id',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function risk_ratings()
    {
        return $this->belongsToMany(RiskRating::class, 'idea_risk_rating');
    }

    public function product_types()
    {
        return $this->belongsToMany(ProductType::class, 'idea_product_type');
    }

    public function major_sectors()
    {
        return $this->belongsToMany(MajorSector::class, 'idea_major_sectors');
    }

    public function minor_sectors()
    {
        return $this->belongsToMany(MinorSector::class, 'idea_minor_sectors');
    }

    public function instruments()
    {
        return $this->belongsToMany(Instrument::class, 'idea_instruments');
    }

    public function currencies()
    {
        return $this->belongsToMany(Currency::class, 'idea_currencies');
    }

    public function regions()
    {
        return $this->belongsToMany(Region::class, 'idea_regions');
    }

    public function countries()
    {
        return $this->belongsToMany(Country::class, 'idea_countries');
    }

    public function holders()
    {
        return $this->belongsToMany(User::class, 'idea_holders');
    }

    public function possible_clients()
    {
        return $this->belongsToMany(User::class, 'idea_possible_clients');
    }

    public function rms()
    {
        return $this->belongsToMany(User::class, 'idea_rms');
    }
}
