<?php

namespace UserFrosting\Sprinkle\Web\Database\Models;

use UserFrosting\Sprinkle\Account\Database\Models\User;
use UserFrosting\Sprinkle\Core\Database\Models\Model;

class UserWallet extends Model
{
    protected $table='user_wallet';

    protected $fillable = [
        'user_id', 'coin_type', 'name', 'address'
    ];
}
