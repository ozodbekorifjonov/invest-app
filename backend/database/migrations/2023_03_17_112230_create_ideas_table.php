<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Fields;

class CreateIdeasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ideas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('abstract');
            $table->dateTime('publish_date');
            $table->dateTime('expiry_date');
            // $table->string('author');            
            $table->string('content');            
            $table->float('risk_rating');            
            $table->foreignIdFor(Fields::class);            
            // $table->foreignIdFor(Instruments::class);            
            // $table->foreignIdFor(Currency::class);            
            // $table->foreignIdFor(MajorSector::class);            
            // $table->foreignIdFor(MinorSector::class);            
            // $table->foreignIdFor(Region::class);            
            // $table->foreignIdFor(Country::class);            
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ideas');
    }
}