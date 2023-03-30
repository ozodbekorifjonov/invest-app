<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currency = Currency::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $currency], 200);
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
            'title' => 'required|max:255',
        ]);
        $newCurrency = Currency::create($storeData);
        if ($newCurrency) {
            return response()->json(['data' => $newCurrency, 'message' => 'Created successfully'], 201);
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
        $currency = Currency::find($id);
        return response()->json(['status' => 200, 'currency' => $currency]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'title' => 'required|max:255',
        ]);
        Currency::whereId($id)->update($updateData);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $currency = Currency::find($id);
        if ($currency->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
