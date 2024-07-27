<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('success_stories', function (Blueprint $table) {
            $table->id(); // 'id' column is unsignedBigInteger by default
            $table->string('title', 255);
            $table->text('content');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->boolean('approved')->nullable();
            $table->foreignId('location_id')->nullable()->constrained('mountain')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('success_stories');
    }
};
