<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MinorSector;
use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $region = Region::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $region], 200);
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
        $newRegion = Region::create($storeData);
        if ($newRegion) {
            return response()->json(['data' => $newRegion, 'message' => 'Created successfully'], 201);
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
        $region = Region::find($id);
        return response()->json(['status' => 200, 'riskRating' => $region]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'name' => 'required|max:255',
        ]);
        Region::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $region = Region::find($id);
        if ($region->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
