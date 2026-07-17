import wave
import math
import struct
import os

def generate_tone(filename, frequency, duration_ms, volume=0.5, wave_type='sine', sweep=0):
    sample_rate = 44100
    num_samples = int(sample_rate * (duration_ms / 1000.0))
    
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            t = float(i) / sample_rate
            # Add frequency sweep if any
            current_freq = frequency + (sweep * t)
            
            if wave_type == 'sine':
                value = math.sin(2.0 * math.pi * current_freq * t)
            elif wave_type == 'square':
                value = 1.0 if math.sin(2.0 * math.pi * current_freq * t) > 0 else -1.0
            elif wave_type == 'sawtooth':
                value = 2.0 * (t * current_freq - math.floor(0.5 + t * current_freq))
            
            # Envelope (fade in/out) to avoid clicks
            envelope = 1.0
            if i < 400:
                envelope = i / 400.0
            elif i > num_samples - 400:
                envelope = (num_samples - i) / 400.0
                
            sample = int(value * envelope * volume * 32767.0)
            wav_file.writeframesraw(struct.pack('<h', sample))

# Flip sound: Quick short high blip
generate_tone('assets/sounds/flip.wav', frequency=800, duration_ms=100, volume=0.3, wave_type='sine')

# Match sound: Cheerful chime (two quick tones, we'll just do one upward sweep)
generate_tone('assets/sounds/match.wav', frequency=500, duration_ms=300, volume=0.4, wave_type='sine', sweep=1000)

# Mismatch sound: Low buzz
generate_tone('assets/sounds/mismatch.wav', frequency=150, duration_ms=400, volume=0.5, wave_type='sawtooth')

# Win sound: Longer upward sweep (fanfare-ish)
generate_tone('assets/sounds/win.wav', frequency=400, duration_ms=1000, volume=0.4, wave_type='sine', sweep=800)

print("Generated sound files.")
