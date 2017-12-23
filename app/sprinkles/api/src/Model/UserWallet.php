<?php

namespace App\Model;


class UserWallet extends Model
{
    protected $table='user_wallet';

    protected $fillable = [
        'user_id', 'coin_type', 'name', 'address'
    ];
}
