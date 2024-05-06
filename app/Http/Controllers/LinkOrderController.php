<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Link;

class LinkOrderController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $requestData = $request->input('data'); // Mengambil hanya properti "data" dari permintaan

        $updatedLinkId = $request->input('data.updatedLinks.id');
        $updatedLinkData = $request->input('data.updatedLinks');

        $targetLinkId = $request->input('data.targetUpdatedLinks.id');
        $targetLinkData = $request->input('data.targetUpdatedLinks');

        $updatedLink = Link::findOrFail($updatedLinkId);

        $updatedLink->update(
            [

                'order' => $updatedLinkData['order'],
            ]
        );

        $targetLink = Link::findOrFail($targetLinkId);

        $targetLink->update(
            [
                'order' => $targetLinkData['order'],
            ]
        );

        // $targetUpdatedLinksData = $request->input('data.targetUpdatedLinks');

        return to_route('links.index')->with('success', 'Link order updated successfully!');
    }
}
