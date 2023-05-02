<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $post], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $newPost = Post::create($storeData);
        if ($newPost) {
            return response()->json(['data' => $newPost, 'message' => 'Created successfully', 'success' => true], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        return response()->json(['status' => 200, 'data' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::find($id);
        return response()->json(['status' => 200, 'data' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        Post::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully', 'success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);
        if ($post->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
