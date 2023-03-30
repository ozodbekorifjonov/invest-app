<?php

namespace App\Http\Controllers;
use App\Models\Fields;

use Illuminate\Http\Request;

class FieldsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fields = Fields::all();
        return view('index', compact('fields'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->validate([
            'name' => 'required|max:255',
        ]);
        $fields = Fields::create($storeData);
        return redirect('/fields')->with('completed', 'Field has been saved!');
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
        $fields = Fields::findOrFail($id);
        return view('edit', compact('fields'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'name' => 'required|max:255',
        ]);
        Fields::whereId($id)->update($updateData);
        return redirect('/fields')->with('completed', 'Field has been updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $fields = Fields::findOrFail($id);
        $fields->delete();
        return redirect('/fields')->with('completed', 'Field has been deleted');
    }
}
