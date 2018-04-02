<?php

namespace AppBundle\Model;

use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;


class UserManager
{
    private $em;
    private $passwordEncoder;

    public function __construct(EntityManager $em, UserPasswordEncoder $passwordEncoder)
    {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function addUser($email, $username, $password)
    {
        $user = new User();
        $user->setEmail($email);
        $user->setUsername($username);
        $encodedPassword = $this->passwordEncoder
            ->encodePassword($user, $password);
        $user->setPassword($encodedPassword);
        $this->em->persist($user);
        $this->em->flush();
        return $user;
    }
}