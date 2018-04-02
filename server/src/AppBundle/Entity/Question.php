<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @Serializer\ExclusionPolicy("all")
 * @ORM\Table(name="question")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\QuestionRepository")
 */
class Question
{
    /**
     * @Serializer\Expose()
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Serializer\Expose()
     * @ORM\Column(type="string")
     */
    private $title;

    /**
     * @Serializer\Expose()
     * @ORM\Column(type="text")
     */
    private $body;

    /**
     * @Serializer\Expose()
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(
     *     name="user_id",
     *     referencedColumnName="id"
     * )
     */
    private $user;

    /**
     * @Serializer\Expose()
     * @ORM\OneToMany(
     *     targetEntity="AppBundle\Entity\Answer",
     *     mappedBy="question",
     *     cascade={"persist", "remove"}
     *     )
     */
    private $answers;

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getBody()
    {
        return $this->body;
    }

    public function setBody($body)
    {
        $this->body = $body;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
    }

    public function getAnswers()
    {
        return $this->answers;
    }
}