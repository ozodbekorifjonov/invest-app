<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Idea;

class IdeaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idea = Idea::all();
        return view('index', compact('idea'));
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
            'title' => 'required|max:255',
            'abstract' => 'required|max:1000',
            'publish_date' => 'required|dateTime',
            'expiry_date' => 'required|dateTime',
            'content' => 'required|max:1500',
            'risk_rating' => 'required|numeric',
            'fields' => 'required|numeric',
        ]);
        $idea = Idea::create($storeData);
        return redirect('/ideas')->with('completed', 'Idea has been saved!');
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
        $idea = Idea::findOrFail($id);
        return view('edit', compact('idea'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'title' => 'required|max:255',
            'abstract' => 'required|max:1000',
            'publish_date' => 'required|dateTime',
            'expiry_date' => 'required|dateTime',
            'content' => 'required|max:1500',
            'risk_rating' => 'required|numeric',
            'fields' => 'required|numeric',
        ]);
        Idea::whereId($id)->update($updateData);
        return redirect('/ideas')->with('completed', 'Idea has been updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $idea = Idea::findOrFail($id);
        $idea->delete();
        return redirect('/ideas')->with('completed', 'Idea has been deleted');
    }
}
