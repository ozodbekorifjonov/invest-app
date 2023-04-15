<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;

class IdeaController extends BaseController
{
    public function index()
    {

        $ideas = Idea::with('risk_ratings', 'product_types', 'major_sectors', 'minor_sectors', 'instruments', 'currencies', 'regions', 'countries', 'holders', 'user')->orderBy('updated_at', 'DESC')->get();

        return $this->sendResponse($ideas, 'Idea fetched.');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required',
            'abstract' => 'required',
            'publish_date' => 'required',
            'expiry_date' => 'required',
            'content' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $user_id = $request->input('user_id');
        $user = User::find($user_id);

        $idea = Idea::create($input);

        $idea->risk_ratings()->attach($request->input('risk_ratings'));
        $idea->product_types()->attach($request->input('product_types'));
        $idea->major_sectors()->attach($request->input('major_sectors'));
        $idea->minor_sectors()->attach($request->input('minor_sectors'));
        $idea->instruments()->attach($request->input('instruments'));
        $idea->currencies()->attach($request->input('currencies'));
        $idea->regions()->attach($request->input('regions'));
        $idea->countries()->attach($request->input('countries'));

        $user->ideas()->save($idea);

        return $this->sendResponse($idea, 'Idea created.');
    }

    public function show($id)
    {
        $idea = Idea::with('risk_ratings', 'product_types', 'major_sectors', 'minor_sectors', 'instruments', 'currencies', 'regions', 'countries', 'user')->find($id);
        if (is_null($idea)) {
            return $this->sendError('Idea does not exist.');
        }
        return $this->sendResponse($idea, 'Idea fetched.');
    }

    public function update(Request $request, string $id)
    {
        $updateData = $request->validate([
            'title' => 'required',
            'abstract' => 'required',
            'publish_date' => 'required',
            'expiry_date' => 'required',
            'content' => 'required',
            'user_id' => 'required',
        ]);
        $idea = Idea::find($id);
        $idea->update($updateData);

        $idea->risk_ratings()->sync($request->input('risk_ratings'));
        $idea->product_types()->sync($request->input('product_types'));
        $idea->major_sectors()->sync($request->input('major_sectors'));
        $idea->minor_sectors()->sync($request->input('minor_sectors'));
        $idea->instruments()->sync($request->input('instruments'));
        $idea->currencies()->sync($request->input('currencies'));
        $idea->regions()->sync($request->input('regions'));
        $idea->countries()->sync($request->input('countries'));

        return $this->sendResponse($idea, 'Idea created.');
    }

    public function updateHolder(Request $request, string $id)
    {
        $idea = Idea::findOrFail($id);
        $user_id = $request->input('user_id');

        $idea->holders()->sync([$user_id]);
        return $this->sendResponse($idea, 'Congrats!!! You are investor.');
    }

    public function destroy(Idea $idea)
    {
        $idea->delete();
        return $this->sendResponse([], 'Idea deleted.');
    }
}
