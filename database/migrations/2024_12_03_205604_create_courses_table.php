<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('courses', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->binary('image')->nullable();  // or use string('image') if you prefer storing the image path
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('courses');
}
};
