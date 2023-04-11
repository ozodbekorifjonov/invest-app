<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('idea_minor_sectors', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('idea_id');
            $table->unsignedInteger('minor_sector_id');
            $table->timestamps();

            $table->foreign('idea_id')->references('id')->on('ideas')->onDelete('cascade');
            $table->foreign('minor_sector_id')->references('id')->on('minor_sectors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('idea_minor_sectors');
    }
};
