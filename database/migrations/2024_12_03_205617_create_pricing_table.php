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
    Schema::create('pricing', function (Blueprint $table) {
        $table->id();
        $table->string('service');
        $table->decimal('price', 8, 2);  // You can adjust the size of the decimal if needed
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('pricing');
}

};
