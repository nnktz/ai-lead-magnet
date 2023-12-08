'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Lead, LeadMagnet, Subscription } from '@prisma/client'
import { SparklesIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { getPayingStatus } from '@/utils/get-paying-status'
import { MAXIMUM_FREE_LEAD_MAGNETS } from '@/lib/constants'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table } from './table'

type ContainerProps = {
  leadMagnets: LeadMagnet[]
  leads: Lead[]
  subscription: Subscription | null
}

export const Container = ({ leadMagnets, leads, subscription }: ContainerProps) => {
  const router = useRouter()
  const [upgrading, setUpgrading] = useState(false)

  const isActive = getPayingStatus(subscription)

  const isMaxFree = !isActive && leadMagnets.length >= MAXIMUM_FREE_LEAD_MAGNETS

  const upgrade = async () => {
    setUpgrading(true)

    try {
      const response = await axios.get('/api/stripe')

      if (response.data.url) {
        router.push(response.data.url)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  return (
    <div className="w-full p-6 lg:mx-auto lg:max-w-5xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Lead Magnets</h2>
        <Button disabled={isMaxFree} variant={'default'} className="disabled:select-none">
          <Link href={'/lead-magnet-editor'}>Create</Link>
        </Button>
      </div>

      <Table leadMagnets={leadMagnets} leads={leads} />

      {!isActive && (
        <div className="mt-8 flex w-full flex-col items-center">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="mx-auto inline-block w-fit bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text pb-1 text-transparent">
                Upgrade To Pro
              </CardTitle>

              <CardContent className="flex flex-col">
                <p className="mb-2 font-semibold text-gray-700">
                  {leadMagnets.length}/{MAXIMUM_FREE_LEAD_MAGNETS} Free Lead Magnets Generated
                </p>

                <Button disabled={upgrading} variant={'ai'} onClick={upgrade}>
                  <SparklesIcon className="mr-2" />
                  {upgrading ? 'Upgrading' : 'Upgrade'}
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  )
}
