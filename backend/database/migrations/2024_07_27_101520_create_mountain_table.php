<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('mountain', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->text('description');
            $table->decimal('latitude', 10, 6);
            $table->decimal('longitude', 10, 6);
            $table->integer('altitude');
            $table->string('country', 100);
            $table->string('region', 100);
            $table->string('img', 100)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mountain');
    }
};
