<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class IdeaController extends BaseController
{
    public function index()
    {

        $ideas = Idea::with('risk_ratings', 'product_types', 'major_sectors', 'minor_sectors')->get();

        return $this->sendResponse($ideas, 'Idea fetched.');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $user = auth::user();
        $validator = Validator::make($input, [
            'title' => 'required',
            'abstract' => 'required',
            'publish_date' => 'required',
            'expiry_date' => 'required',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $idea = Idea::create($input);
        $idea->risk_ratings()->attach($request->input('risk_ratings'));
        return $this->sendResponse($idea, 'Idea created.');
    }

    public function show($id)
    {
        $idea = Idea::find($id);
        if (is_null($idea)) {
            return $this->sendError('Idea does not exist.');
        }
        return $this->sendResponse($idea, 'Idea fetched.');
    }

    public function update(Request $request, Idea $idea)
    {
        //
    }

    public function destroy(Idea $idea)
    {
        $idea->delete();
        return $this->sendResponse([], 'Idea deleted.');
    }
}
