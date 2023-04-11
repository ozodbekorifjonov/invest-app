<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MinorSector;
use Illuminate\Http\Request;

class MinorSectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $minorSector = MinorSector::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $minorSector], 200);
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
        $newMinorSector = MinorSector::create($storeData);
        if ($newMinorSector) {
            return response()->json(['data' => $newMinorSector, 'message' => 'Created successfully'], 201);
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
        $minorSector = MinorSector::find($id);
        return response()->json(['status' => 200, 'riskRating' => $minorSector]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'name' => 'required|max:255',
        ]);
        MinorSector::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $minorSector = MinorSector::find($id);
        if ($minorSector->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
