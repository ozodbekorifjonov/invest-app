<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Instruments;
use Illuminate\Http\Request;

class InstrumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $instruments = Instruments::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $instruments], 200);
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
        $newInstrument = Instruments::create($storeData);
        if ($newInstrument) {
            return response()->json(['data' => $newInstrument, 'message' => 'Created successfully'], 201);
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
        $instrument = Instruments::find($id);
        return response()->json(['status' => 200, 'riskRating' => $instrument]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'name' => 'required|max:255',
        ]);
        Instruments::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $instrument = Instruments::find($id);
        if ($instrument->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
