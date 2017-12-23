<?php

namespace App\Model;

use Carbon\Carbon;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Eloquent\SoftDeletes;
use UserFrosting\Sprinkle\Account\Facades\Password;
use UserFrosting\Sprinkle\Core\Database\Models\Model;
use UserFrosting\Sprinkle\Core\Facades\Debug;
use UserFrosting\Sprinkle\Web\Database\Models\Address;
use UserFrosting\Sprinkle\Web\Database\Models\UserBalance;

/**
 * User Class
 *
 * Represents a User object as stored in the database.
 *
 * @author Alex Weissman (https://alexanderweissman.com)
 * @property int id
 * @property string username
 * @property string first_name
 * @property string last_name
 * @property string email
 * @property string locale
 * @property string theme
 * @property int group_id
 * @property bool flag_verified
 * @property bool flag_enabled
 * @property int last_activity_id
 * @property timestamp created_at
 * @property timestamp updated_at
 * @property string password
 * @property timestamp deleted_at
 */
class User extends \UserFrosting\Sprinkle\Account\Database\Models\User
{



    public function addresss()
    {
        return $this->hasMany(Address::class)->orderBy('created_at', 'desc');
    }

    public function balances()
    {
        return $this->hasMany(UserBalance::class)->orderBy('created_at', 'asc');
    }

}

