<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $country = Country::orderBy('updated_at', 'DESC')->get();
        return response()->json(['success' => true, 'data' => $country], 200);
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
        $request->validate([
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $input = $request->all();

        if ($image = $request->file('image')) {
            $destinationPath = 'images/';
            $countryImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $countryImage);
            $input['image'] = "$countryImage";
        }

        Country::create($input);
        return response()->json(['message' => 'Created successfully'], 201);
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
        $country = Country::find($id);
        return response()->json(['status' => 200, '$country' => $country]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $input = $request->all();

        if ($image = $request->file('image')) {
            $destinationPath = 'images/';
            $countryImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $countryImage);
            $input['image'] = "$countryImage";
        } else {
            unset($input['image']);
        }

        Country::whereId($id)->update($input);
        return response()->json(['message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $country = Country::find($id);
        if ($country->delete()) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        }
    }
}
