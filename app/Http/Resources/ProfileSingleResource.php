<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'username' => $this->user->username,
                'email' => $this->user->email,
                'links' => $this->user->links->map(function ($link) {
                    return [
                        'id' => $link->id,
                        'title' => $link->title,
                        'url' => $link->url,
                        // tambahkan kolom lain sesuai kebutuhan
                    ];
                }),
            ],
        ];
    }
}
