<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('idea_risk_rating', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('idea_id');
            $table->unsignedInteger('risk_rating_id');
            $table->timestamps();

            $table->foreign('idea_id')->references('id')->on('ideas')->onDelete('cascade');
            $table->foreign('risk_rating_id')->references('id')->on('risk_ratings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('idea_risk_rating');
    }
};
