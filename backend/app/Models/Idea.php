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
        'instruments',
        'currency',
        'region',
        'country',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'instruments' => 'array',
        'currency' => 'array',
        'region' => 'array',
        'country' => 'array',
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
}
