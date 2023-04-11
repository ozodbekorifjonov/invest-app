<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MajorSector;
use Illuminate\Http\Request;

class MajorSectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $majorSector = MajorSector::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $majorSector], 200);
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
            'name' => 'required|max:255',
        ]);
        $newMajorSector = MajorSector::create($storeData);
        if ($newMajorSector) {
            return response()->json(['data' => $newMajorSector, 'message' => 'Created successfully'], 201);
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
        $majorSector = MajorSector::find($id);
        return response()->json(['status' => 200, 'riskRating' => $majorSector]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'name' => 'required|max:255',
        ]);
        MajorSector::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $majorSector = MajorSector::find($id);
        if ($majorSector->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
