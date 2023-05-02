<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $about_us = AboutUs::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $about_us], 200);
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
            'content' => 'required',
        ]);
        $newAboutUs = AboutUs::create($storeData);
        if ($newAboutUs) {
            return response()->json(['data' => $newAboutUs, 'message' => 'Created successfully'], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $about_us = AboutUs::find($id);
        return response()->json(['status' => 200, 'data' => $about_us]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'content' => 'required',
        ]);
        AboutUs::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $about_us = AboutUs::find($id);
        if ($about_us->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
