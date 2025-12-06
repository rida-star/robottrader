-- Fix support_tickets security issues

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can view their own tickets" ON public.support_tickets;

-- Update user_id to NOT NULL (requires authenticated users)
-- First, delete any tickets with NULL user_id (if any exist)
DELETE FROM public.support_tickets WHERE user_id IS NULL;

-- Make user_id NOT NULL to enforce authentication requirement
ALTER TABLE public.support_tickets ALTER COLUMN user_id SET NOT NULL;

-- Create new INSERT policy - only authenticated users can create tickets with their own user_id
CREATE POLICY "Authenticated users can create their own tickets"
ON public.support_tickets
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create new SELECT policy - users can only view their own tickets (no NULL matching possible now)
CREATE POLICY "Users can view their own tickets"
ON public.support_tickets
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);