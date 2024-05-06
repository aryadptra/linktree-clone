<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;

class LinkStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Link $link)
    {
        $request->validate([
            'is_active' => 'required',
        ]);

        $link->update([
            'is_active' => $request->is_active
        ]);

        return to_route('links.index')->with('success', 'Link status updated successfully!');
    }
}
