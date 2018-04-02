<?php

namespace AppBundle\Model;

use AppBundle\Entity\Answer;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AnswerManager
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function addAnswer($answerBody, $questionId, $user)
    {
        $question = $this->em->getRepository('AppBundle:Question')->find($questionId);
        if (!$question) {
            throw new NotFoundHttpException("Question not found");
        }
        $answer = new Answer();
        $answer->setBody($answerBody);
        $answer->setQuestion($question);
        $answer->setUser($user);
        $this->em->persist($answer);
        $this->em->flush();
        return $answer;
    }

    public function updateAnswer($answerId, $answerBody, User $user) {
        $answer = $this->em->getRepository('AppBundle:Answer')->find($answerId);
        if (!$answer) {
            throw new NotFoundHttpException('Answer not found');
        }
        if ($answer->getUser() !== $user) {
            throw new AccessDeniedHttpException('Access denied!');
        }
        $answer->setBody($answerBody);
        $this->em->persist($answer);
        $this->em->flush();
        return $answer;
    }

    public function deleteAnswer($id, User $user)
    {
        $answer = $this->em->getRepository('AppBundle:Answer')->find($id);
        if (!$answer) {
            throw new NotFoundHttpException('Answer not found');
        }
        if ($answer->getUser() !== $user) {
            throw new AccessDeniedHttpException('Access denied!');
        }
        $this->em->remove($answer);
        $this->em->flush();
    }
}