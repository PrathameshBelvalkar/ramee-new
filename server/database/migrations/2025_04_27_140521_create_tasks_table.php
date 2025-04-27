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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('priority', ['Low', 'Medium', 'High']);
            $table->string('type');
            $table->date('due_date');
            $table->unsignedBigInteger('govt_organization_id')->nullable();
            $table->unsignedBigInteger('assigned_staff_id')->nullable();
            $table->string('file_path')->nullable(); // store relative path
            $table->timestamps();

            // Optional: If you have govt organizations and staff tables
            // You can add foreign keys if needed:
            // $table->foreign('govt_organization_id')->references('id')->on('organizations')->onDelete('set null');
            // $table->foreign('assigned_staff_id')->references('id')->on('staff')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
