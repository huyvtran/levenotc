<?php

namespace UserFrosting\Sprinkle\Web\Database\Models;

use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Core\Database\Models\Model;

class WalletAddress extends Model
{
    public $timestamps = false;

    protected $table = 'wallet_address';
    protected $fillable = [
         'coin_type', 'address','user_id'
    ];
    protected $guarded = [];
}
