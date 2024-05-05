<?php

namespace App\Http\Controllers;

use App\Http\Resources\LinkItemResource;
use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $links = Link::query()->where('user_id', auth()->user()->id)->orderBy('order', 'asc')->get();
        return Inertia::render('Link/Index', [
            'links' => LinkItemResource::collection($links),
        ]);
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
            'title' => 'required|max:15', // Menambahkan aturan max:15 untuk membatasi panjang karakter title menjadi maksimal 15
            'url' => 'required|url|unique:links',
        ], [
            'title.max' => 'The title may not be greater than 15 characters.', // Pesan khusus untuk aturan max pada title
        ]);

        $user_id = auth()->user()->id;

        // Get all links of users has
        $links = Link::query()->where('user_id', $user_id)->get();
        $order = 0;

        // Check if user has link or no
        if (count($links) > 0) {
            $order = $links->max('order') + 1;
        }

        $link = Link::create([
            'title' => $request->title,
            'url' => $request->url,
            'user_id' => $user_id,
            'order' => $order
        ]);

        return to_route('links.index')->with('success', 'Link created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Link $link)
    {
        $request->validate([
            'title' => 'required',
            'url' => 'required'
        ]);

        $link->update([
            'title' => $request->title,
            'url' => $request->url
        ]);

        return to_route('links.index')->with('success', 'Link updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        $link->delete();

        return to_route('links.index')->with('success', 'Link deleted successfully!');
    }
}
