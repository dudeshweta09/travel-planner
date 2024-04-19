'use client'
import Header from '@/components/header'
import React from 'react'
import AuthGuard from '@/components/auth-header'
import TravelPlan from '@/components/trav-plan'

const CreatePlan = () => {
  return (
    <AuthGuard>
    <>
    <Header/>
    <TravelPlan/>
    </>
    </AuthGuard>  
  )
}

export default CreatePlan
