<?php

namespace AppBundle\Model;


use AppBundle\Entity\Question;
use AppBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class QuestionManager
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function addQuestion($questionTitle, $questionBody, User $user) {
        $question = new Question();
        $question->setUser($user);
        $question->setBody($questionBody);
        $question->setTitle($questionTitle);
        $this->em->persist($question);
        $this->em->flush();
        return $question;
    }

    public function updateQuestion($questionId, $questionTitle, $questionBody, User $user) {
        $question = $this->em->getRepository('AppBundle:Question')->find($questionId);
        if (!$question) {
            throw new NotFoundHttpException('Question not found');
        }
        if ($question->getUser() !== $user) {
            throw new AccessDeniedHttpException('Access denied!');
        }
        $question->setBody($questionBody);
        $question->setTitle($questionTitle);
        $this->em->persist($question);
        $this->em->flush();
        return $question;
    }

    public function deleteQuestion($id, User $user) {
        $question = $this->em->getRepository('AppBundle:Question')->find($id);
        if (!$question) {
            throw new NotFoundHttpException('Question not found');
        }
        if ($question->getUser() !== $user) {
            throw new AccessDeniedHttpException('Access denied!');
        }
        $this->em->remove($question);
        $this->em->flush();
    }
}