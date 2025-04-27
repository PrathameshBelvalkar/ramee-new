<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function index()
    {
        try {
            $tasks = Task::all();

            return response()->json([
                'status' => true,
                'message' => 'Tasks fetched successfully',
                'data' => $tasks,
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task Index Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch tasks',
                'data' => [],
                'code' => 500
            ], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'priority' => 'required|in:Low,Medium,High',
                'type' => 'required|string',
                'due_date' => 'required|date',
                'govt_organization_id' => 'nullable|integer',
                'assigned_staff_id' => 'nullable|integer',
                'file' => 'nullable|file|max:10240',
            ]);

            $task = new Task();
            $task->title = $validated['title'];
            $task->description = $validated['description'];
            $task->priority = $validated['priority'];
            $task->type = $validated['type'];
            $task->due_date = $validated['due_date'];
            $task->govt_organization_id = $validated['govt_organization_id'] ?? null;
            $task->assigned_staff_id = $validated['assigned_staff_id'] ?? null;

            if ($request->hasFile('file')) {
                $relativePath = Storage::disk('public')->put('uploads/tasks', $request->file('file'));
                $task->file_path = $relativePath;
            }

            $task->save();

            return response()->json([
                'status' => true,
                'message' => 'Task created successfully',
                'data' => $task,
                'code' => 201
            ], 201);
        } catch (\Exception $e) {
            Log::error('Task Create Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Failed to create task',
                'data' => [],
                'code' => 500
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'priority' => 'sometimes|required|in:Low,Medium,High',
                'type' => 'sometimes|required|string',
                'due_date' => 'sometimes|required|date',
                'govt_organization_id' => 'nullable|integer',
                'assigned_staff_id' => 'nullable|integer',
                'file' => 'nullable|file|max:10240',
            ]);

            $task->fill($validated);

            if ($request->hasFile('file')) {
                $relativePath = Storage::disk('public')->put('uploads/tasks', $request->file('file'));
                $task->file_path = $relativePath;
            }

            $task->save();

            return response()->json([
                'status' => true,
                'message' => 'Task updated successfully',
                'data' => $task,
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task Update Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Failed to update task',
                'data' => [],
                'code' => 500
            ], 500);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();

            return response()->json([
                'status' => true,
                'message' => 'Task deleted successfully',
                'data' => [],
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task Delete Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Failed to delete task',
                'data' => [],
                'code' => 500
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $task = Task::findOrFail($id);

            return response()->json([
                'status' => true,
                'message' => 'Task fetched successfully',
                'data' => $task,
                'code' => 200
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task Show Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch task',
                'data' => [],
                'code' => 500
            ], 500);
        }
    }

}
