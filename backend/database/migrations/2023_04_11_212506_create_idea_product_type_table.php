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
        Schema::create('idea_product_type', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('idea_id');
            $table->unsignedInteger('product_type_id');
            $table->timestamps();

            $table->foreign('idea_id')->references('id')->on('ideas')->onDelete('cascade');
            $table->foreign('product_type_id')->references('id')->on('product_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('idea_product_type');
    }
};
