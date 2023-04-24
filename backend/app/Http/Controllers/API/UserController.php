<?php

namespace App\Http\Controllers\API;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\BaseController as BaseController;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users, 'Users fetched.');
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = auth::user();
        return $this->sendResponse($user, 'User info');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'telephone' => 'required',
            'email' => 'required',
        ]);
        $user = User::whereId($id)->update($updateData);

        return $this->sendResponse($user, 'User updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function userRecommendsUpdate(Request $request, string $id)
    {
        $updateData = $request->validate([
            'product_types' => 'nullable',
            'currencies' => 'nullable',
            'countries' => 'nullable',
        ]);
        User::whereId($id)->update($updateData);
        return response()->json(['message' => "Updated successfully", 'success' => true]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUserRole(Request $request, string $id)
    {
        $updateData = $request->validate([
            'role' => 'required',
        ]);
        $user = User::whereId($id)->update($updateData);

        return $this->sendResponse($user, 'User role updated.');
    }

    public function holdingsList(string $id)
    {
        $holdings = Idea::whereHas('holders', function ($q) use ($id) {
            $q->where('user_id', '=', $id);
        })->with('risk_ratings', 'product_types', 'major_sectors',
            'minor_sectors', 'instruments', 'currencies', 'regions', 'countries', 'user')->get();

        return $this->sendResponse($holdings, 'Holdings list.');
    }

    public function usersListByRole(Request $request)
    {

        $role = $request->input('role');

        if ($role == 'RM') {
            $users = User::where('role', 'RM')->get();
            return $this->sendResponse($users, 'Users list by RM role.');
        }

        if ($role == 'CLIENT') {
            $users = User::where('role', 'CLIENT')->get();
            return $this->sendResponse($users, 'Users list by CLIENT role.');
        }

        return $this->sendResponse([], 'Empty users list.');
    }

    public function possibleClientsList(Request $request)
    {
        $role = $request->input('role');

        if ($role == 'RM' || $role == 'ADMIN') {
            $users = User::with('possible_ideas')->orderBy('updated_at', 'DESC')->get();
            $potentialUsers = $users->where('possible_ideas', '!=', '[]');

            return $this->sendResponse($potentialUsers, 'Possible clients fetched.');
        }

        return $this->sendResponse([], 'Possible clients list.');
    }

    public function showRecommendedIdeas(string $id)
    {
        $recommendedIdeas = Idea::whereHas('possible_clients', function ($q) use ($id) {
            $q->where('user_id', '=', $id);
        })->with('rms', 'user')->get();

        return $this->sendResponse($recommendedIdeas, 'Possible ideas');
    }
}
