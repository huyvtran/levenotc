<?php

namespace App\Model;


class WalletAddress extends Model
{
    public $timestamps = false;

    protected $table = 'wallet_address';
    protected $fillable = [
         'coin_type', 'address','user_id'
    ];
    protected $guarded = [];
}
